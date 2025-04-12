import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const teamMembers = [
  {
    name: "Amogh Gurram",
    title: "UI/UX Designer and Frontend Developer",
    description: "University of Maryland, College Park",
    linkName: "LinkedIn",
    professionalLink: "https://www.linkedin.com/in/amogh-gurram",
    imgUrl: "/team/amogh.jpeg",
  },
  {
    name: "Jayant Kammula",
    title: "Backend Developer",
    description: "University of Maryland, College Park",
    linkName: "LinkedIn",
    professionalLink: "https://www.linkedin.com/in/jayantkammula",
    imgUrl: "/team/jayant.jpeg",
  },
  {
    name: "Pranav Palle",
    title: "Full Stack Developer and Project Manager",
    description: "University of Maryland, College Park",
    linkName: "Personal Website",
    professionalLink: "https://pranavpalle.netlify.app",
    imgUrl: "/team/pranav.jpeg",
  },
  {
    name: "Shivank Bhimavarapu",
    title: "UI/UX Designer and Frontend Developer",
    description: "University of Maryland, College Park",
    linkName: "Personal Website",
    professionalLink: "https://sbhima.vercel.app/",
    imgUrl: "/team/shivank.jpeg",
  },
];

export default function Contact() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      <div className="p-6 w-full"></div>
      <h1 className="text-6xl font-bold mb-8">Meet The Team</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {teamMembers.map((member, index) => (
          <Card key={index} className="overflow-hidden shadow-md p-0">
            <div className="relative h-64 w-full">
              <Image
                src={member.imgUrl}
                alt={member.name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-lg"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {member.title}
              </p>
              <p className="text-sm">{member.description}</p>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <a
                href={member.professionalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full">{member.linkName}</Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
