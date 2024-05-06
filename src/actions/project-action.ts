"use server";

import db from "@/db";
import { projects } from "@/db/schema/projects";
import { getCurrentUser, getUserByEmail } from "@/services/user-service";
import { CreateProjectSchema } from "@/types/zod-schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import * as z from "zod";

interface ProjectModel {
  name: string;
  thumbnailUrl?: string;
  location: string;
  area: number;
  description: string;
  category: string;
  imageModel: string[];
  designerId: string;
  userId: string;
}

export const createProject = async (
  values: z.infer<typeof CreateProjectSchema>
) => {
  const validatedFields = CreateProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const projectId = `${values.projectName.split(" ").join("-").toLowerCase()}`;

  const existingProject = (
    await db.select().from(projects).where(eq(projects.id, projectId))
  )[0];

  if (existingProject) {
    return {
      error: "A project with this name already exists! Try with another name.",
    };
  }

  const user = await getUserByEmail(values.clientEmail);

  console.log({ user });

  const designer = await getCurrentUser();

  console.log({ designer });

  const insertProject = async (project: ProjectModel) => {
    await db.insert(projects).values({
      id: projectId,
      name: project.name,
      thumbnailUrl: project.thumbnailUrl,
      location: project.location,
      area: project.area,
      description: project.description,
      category: project.category,
      imageModel: project.imageModel,
      designerId: project.designerId,
      userId: project.userId,
    });
  };

  insertProject({
    name: values.projectName,
    thumbnailUrl: "",
    location: values.location,
    area: parseInt(values.area),
    description: values.description,
    category: values.category,
    imageModel: [],
    designerId: designer.id,
    userId: user.id,
  });

  return { success: "Project added!" };
};

export const deleteProject = async (projectId: string) => {
  const project = (
    await db.select().from(projects).where(eq(projects.id, projectId))
  )[0];

  const utapi = new UTApi();

  if (project === null) {
    return { error: "Project not found!" };
  }

  if (project.thumbnailUrl !== null) {
    const newUrl = project.thumbnailUrl.substring(
      project.thumbnailUrl.lastIndexOf("/") + 1
    );

    await utapi.deleteFiles(newUrl);
  }

  await db.delete(projects).where(eq(projects.id, projectId));

  return { success: "Project deleted!" };
};
