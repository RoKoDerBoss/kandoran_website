import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavBar() {
  return (
    <div className="flex justify-between items-center w-full p-1 pr-10 border-b border-gray-200">
      <div className="flex ms-6">
        <Image src="/logo.svg" alt="" width={60} height={60} className="svg-color-foreground"/>
        <Image src="/logo2.svg" alt="" width={120} height={120} className="mt-4 svg-color-foreground"/>
      </div>
      <div>
      <NavigationMenu>
      <NavigationMenuList className="gap-6">
        <NavigationMenuItem>
          <NavigationMenuLink className="text-{var(--foreground)} rounded-md px-3 py-2 font-medium text-base" href="/">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: 'hsl(var(--foreground))' }} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" ><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/></svg>
              Discord
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="text-{var(--foreground)} rounded-md px-3 py-2 font-medium text-base" href="/compendia">
            <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" style={{filter: 'brightness(0) invert(0)'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Kandoran
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="text-{var(--foreground)} rounded-md px-3 py-2 font-medium text-base" href="/guild">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" style={{filter: 'brightness(0) invert(0)'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Die Gilde
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
           <NavigationMenuLink href="/statistics">
              <NavigationMenuTrigger className="text-{var(--foreground)} rounded-md px-3 py-2 font-medium text-base">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" style={{filter: 'brightness(0) invert(0)'}} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                  Statistik
                </div>
              </NavigationMenuTrigger>
            </NavigationMenuLink> 
          <NavigationMenuContent>
            <div className="min-w-[220px] bg-white p-2">
              <NavigationMenuLink href="/statistics" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md">
                Dashboard
              </NavigationMenuLink>
              <NavigationMenuLink href="/statistics" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md">
                Charaktere
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>
      </div>
    </div>
  );
}