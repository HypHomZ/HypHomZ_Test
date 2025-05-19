"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Sample services data - in a real app, this would come from an API or database
const services = [
  { id: 1, name: "Cleaning Services", slug: "cleaning" },
  { id: 2, name: "Repair & Maintenance", slug: "repair" },
  { id: 3, name: "Maid Services", slug: "maid" },
  { id: 4, name: "Laundry Services", slug: "laundry" },
  { id: 5, name: "Meal Preparation", slug: "meal" },
  { id: 6, name: "Installation Services", slug: "installation" },
  { id: 7, name: "Carpentry", slug: "carpentry" },
  { id: 8, name: "Electrical Services", slug: "electrical" },
  { id: 9, name: "Car Washing", slug: "car-washing" },
  { id: 10, name: "Gardening", slug: "gardening" },
  { id: 11, name: "Salon for Women", slug: "salon-women" },
  { id: 12, name: "Salon for Men", slug: "salon-men" },
  { id: 13, name: "Plumbing", slug: "plumbing" },
  { id: 14, name: "Pest Control", slug: "pest-control" },
  { id: 15, name: "Painting", slug: "painting" },
]

interface SearchBarProps {
  placeholder?: string
  className?: string
  onSearch?: () => void
}

export default function SearchBar({
  placeholder = "What service do you need?",
  className = "",
  onSearch,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<typeof services>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredResults = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setResults(filteredResults)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [searchTerm])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const clearSearch = () => {
    setSearchTerm("")
    setResults([])
    setIsOpen(false)
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchTerm)}`)
      clearSearch()
      if (onSearch) onSearch()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <div className="relative flex w-full">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            className="pl-10 pr-10 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 1 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full p-0"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Button className="ml-2" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 p-2 max-h-[300px] overflow-auto">
          <ul className="space-y-1">
            {results.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block p-2 hover:bg-muted rounded-md"
                  onClick={() => {
                    setIsOpen(false)
                    if (onSearch) onSearch()
                  }}
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {isOpen && results.length === 0 && searchTerm.length > 1 && (
        <Card className="absolute z-10 w-full mt-1 p-4 text-center">
          <p className="text-muted-foreground">No services found matching "{searchTerm}"</p>
          <p className="text-sm mt-1">Try a different search term or browse our services</p>
          <Button
            variant="link"
            asChild
            className="mt-2"
            onClick={() => {
              if (onSearch) onSearch()
            }}
          >
            <Link href="/services">Browse All Services</Link>
          </Button>
        </Card>
      )}
    </div>
  )
}
