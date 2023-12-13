"use client";

import { Menu } from '@headlessui/react'
import { MenuIcon } from 'lucide-react';
import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav
      className="text-white mx-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6"
    >
      <Menu>
        <Menu.Button>Categorias</Menu.Button>
        <Menu.Items className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Menu.Item key={route.href}>
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm font-medium transition-all hover:text-yellow-300 hover:blur-[1px]',
                  route.active ? 'text-yellow-400' : 'text-neutral-300'
                )}
              >
                {route.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </nav>
  )
};

export default MainNav;