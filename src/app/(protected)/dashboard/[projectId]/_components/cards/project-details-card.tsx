import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Landmark } from "lucide-react";

interface Props {
  project: {
    designerId: string | null;
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
    thumbnailUrl: string | null;
    location: string;
    area: number;
    description: string;
    category: string;
    imageModel: string[];
  };
}

export const ProjectDetailsCard = ({ project }: Props) => {
  return (
    <>
      <Card className="h-[300px] lg:h-[350px] xl:h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {project.name}
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-foreground text-lg font-semibold">
              {project.location}
            </p>
            <div className="flex gap-x-4 text-sm">
              <p className="text-muted-foreground ">Location</p>
              <div className="flex items-center justify-center text-lime-500">
                <p>DPS Dwarka</p>
                <Landmark className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-foreground text-lg font-semibold">
              3 BHK Studio Apartment
            </p>
            <div className="flex gap-x-4  text-sm">
              <p className="text-muted-foreground">Category</p>
              <p className="text-lime-500">{project.category}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-sm">status - pending</CardFooter>
      </Card>
    </>
  );
};
