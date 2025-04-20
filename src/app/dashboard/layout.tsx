import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ThemeMode";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const myCookies = await cookies();
  const access = myCookies.get("accessToken");
  const role = myCookies.get("role")?.name;

  if (!access) {
    if (role != "Admin") {
      redirect("/login");
    }
  }

  return (
    <SidebarProvider className="min-h-screen bg-white dark:bg-gray-900">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-all ease-linear">
          {/* Sidebar Trigger and Separator */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* Breadcrumbs */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center">
            <ModeToggle /> {/* Theme toggle button here */}
          </div>
        </header>

        {/* Main Content */}
        <main className="p-2 overflow-auto"> {children} </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
