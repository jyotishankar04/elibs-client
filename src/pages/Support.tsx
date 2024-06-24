import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";

function Support() {
  return (
    <div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] container flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link
              to="/setting"
              className=" text-primary rounded-md  w-10/12 p-2"
            >
              General
            </Link>
            <Link
              to="/setting/security"
              className="text-primary rounded-md  w-10/12 p-2"
            >
              Security
            </Link>
            <Link
              className="font-semibold bg-gray-100  text-primary rounded-md  w-10/12 p-2"
              to="/setting/support"
            >
              Support
            </Link>
          </nav>
          <Card className="p-2"></Card>
        </div>
      </main>
    </div>
  );
}

export default Support;
