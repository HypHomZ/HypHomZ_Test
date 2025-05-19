"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  ChevronDown,
  Newspaper,
  Info,
  HelpCircle,
  Phone,
  Sparkles,
  Scissors,
  Briefcase,
  Bath,
  Wrench,
  Paintbrush,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { useCart } from "@/context/cart-context"
import SearchBar from "./search-bar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define menu structure with icons
const menuItems = [
  {
    title: "Services",
    icon: <Sparkles className="h-4 w-4 mr-2" />,
    href: "/services",
    submenu: [
      { title: "Salon for Women", icon: <Scissors className="h-4 w-4 mr-2" />, href: "/services/salon-women" },
      { title: "Haircut for Men", icon: <Scissors className="h-4 w-4 mr-2" />, href: "/services/hair-men" },
      { title: "House Cleaning", icon: <Bath className="h-4 w-4 mr-2" />, href: "/services/cleaning" },
      { title: "Home Repairs", icon: <Wrench className="h-4 w-4 mr-2" />, href: "/services/repairs" },
      { title: "Painting", icon: <Paintbrush className="h-4 w-4 mr-2" />, href: "/services/painting" },
      { title: "Gardening", icon: <Leaf className="h-4 w-4 mr-2" />, href: "/services/gardening" },
    ],
  },
  {
    title: "Blog",
    icon: <Newspaper className="h-4 w-4 mr-2" />,
    href: "/blog",
    submenu: [],
  },
  {
    title: "How It Works",
    icon: <HelpCircle className="h-4 w-4 mr-2" />,
    href: "/how-it-works",
    submenu: [],
  },
  {
    title: "Become a Provider",
    icon: <Briefcase className="h-4 w-4 mr-2" />,
    href: "/become-provider",
    submenu: [],
  },
  {
    title: "About",
    icon: <Info className="h-4 w-4 mr-2" />,
    href: "/about",
    submenu: [],
  },
  {
    title: "Contact",
    icon: <Phone className="h-4 w-4 mr-2" />,
    href: "/contact",
    submenu: [],
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { totalItems, openCart } = useCart()
  const searchRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative overflow-hidden rounded-md transition-all duration-300 group-hover:scale-110">
              <Image src="/logo.png" alt="HypHomZ Logo" width={40} height={40} className="rounded-md" />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {menuItems.map((item) =>
            item.submenu && item.submenu.length > 0 ? (
              <DropdownMenu
                key={item.title}
                onOpenChange={(open) => (open ? setActiveDropdown(item.title) : setActiveDropdown(null))}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium flex items-center gap-1 px-3 py-2 h-9 
                      ${activeDropdown === item.title ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"} 
                      transition-all duration-300 hover:scale-105`}
                  >
                    {item.icon}
                    {item.title}
                    <ChevronDown
                      className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDropdown === item.title ? "rotate-180" : ""}`}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-56 p-2 animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
                >
                  {item.submenu.map((subItem) => (
                    <DropdownMenuItem key={subItem.title} asChild className="py-2 cursor-pointer">
                      <Link href={subItem.href} className="flex items-center gap-2 w-full">
                        <div className="bg-primary/10 p-1.5 rounded-md text-primary">{subItem.icon}</div>
                        <span>{subItem.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                className="text-sm font-medium flex items-center gap-1 px-3 py-2 rounded-md hover:bg-accent/50 transition-all duration-300 hover:scale-105"
              >
                {item.icon}
                {item.title}
              </Link>
            ),
          )}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={toggleSearch}
            className="h-9 w-9 hover:scale-110 transition-transform duration-300"
          >
            <Search className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Shopping cart"
            onClick={openCart}
            className="relative h-9 w-9 hover:scale-110 transition-transform duration-300"
          >
            <ShoppingBag className="h-[1.2rem] w-[1.2rem]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs flex items-center justify-center text-primary-foreground animate-in zoom-in-75">
                {totalItems}
              </span>
            )}
          </Button>
          <ModeToggle />
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="transition-all duration-300 hover:border-primary hover:text-primary"
              >
                Login/SignUp
              </Button>
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-[1.2rem] w-[1.2rem]" /> : <Menu className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
      </div>

      {/* Responsive Search Bar */}
      {isSearchOpen && (
        <div
          ref={searchRef}
          className="container py-3 px-4 md:px-6 border-t border-border animate-in fade-in slide-in-from-top duration-300"
        >
          <SearchBar className="w-full" onSearch={() => setIsSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden border-t border-border animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-1 py-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.submenu && item.submenu.length > 0 ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                      className="flex items-center justify-between w-full text-sm font-medium px-3 py-2.5 rounded-md hover:bg-accent"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        {item.title}
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === item.title ? "rotate-180" : ""}`}
                      />
                    </button>

                    {activeDropdown === item.title && (
                      <div className="ml-6 mt-1 space-y-1 border-l-2 border-border pl-4">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-accent"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.icon}
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm font-medium px-3 py-2.5 rounded-md hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex gap-4 pt-4 mt-2 border-t border-border">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Button>
              </Link>
              <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
