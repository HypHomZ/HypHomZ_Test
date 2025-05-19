"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"
import { useLocation } from "@/context/location-context"

const popularCities = ["Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"]

const allCities = [
  ...popularCities,
  "Jaipur",
  "Chandigarh",
  "Lucknow",
  "Indore",
  "Kochi",
  "Coimbatore",
  "Nagpur",
  "Surat",
]

export function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, setLocation } = useLocation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCities = searchQuery
    ? allCities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()))
    : allCities

  const handleSelectCity = (city: string) => {
    setLocation({ city })
    setIsLocationModalOpen(false)
  }

  return (
    <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select your location</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for your city..."
            className="pl-10"
          />
        </div>

        {searchQuery.length === 0 && (
          <>
            <div>
              <h3 className="text-sm font-medium mb-2">Popular Cities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {popularCities.map((city) => (
                  <Button
                    key={city}
                    variant="outline"
                    className="justify-start gap-2"
                    onClick={() => handleSelectCity(city)}
                  >
                    <MapPin className="h-3 w-3" />
                    {city}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        <div>
          <h3 className="text-sm font-medium mb-2">{searchQuery ? "Results" : "All Cities"}</h3>
          <div className="max-h-60 overflow-y-auto">
            {filteredCities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCities.map((city) => (
                  <Button
                    key={city}
                    variant="ghost"
                    className="justify-start gap-2"
                    onClick={() => handleSelectCity(city)}
                  >
                    <MapPin className="h-3 w-3" />
                    {city}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No cities found</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
