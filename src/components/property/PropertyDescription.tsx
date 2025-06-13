import { Property } from '@/types/property';
import { formatPropertyType } from '@/utils/propertyTypeUtils';
import { Badge } from '@/components/ui/badge';

interface PropertyDescriptionProps {
  property: Property;
}

import React, { useEffect, useState } from "react";

const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
  const [highlights, setHighlights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function fetchHighlights() {
      setLoading(true);
      setHighlights(null);
      try {
        const res = await fetch("/api/gemini-property-highlights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: property.description,
            location: (property as any).location || (property as any).address || ""
          })
        });
        const data = await res.json();
        if (!ignore) setHighlights(data.highlights);
      } catch {
        if (!ignore) setHighlights(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (property.description) fetchHighlights();
    return () => { ignore = true; };
  }, [property.description, (property as any).location, (property as any).address]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">About This Property</h2>
      <div className="prose max-w-none">
        <div className="mb-4">
          <Badge variant="secondary" className="mb-2">
            {formatPropertyType(property)}
          </Badge>
          <p className="mt-4" style={{ whiteSpace: "pre-line" }}>{property.description}</p>
        </div>
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <h3 className="text-lg font-medium mb-2">Property Highlights</h3>
          {loading ? (
            <p className="text-muted-foreground">Generating highlights...</p>
          ) : highlights ? (
            <p className="text-muted-foreground" style={{ whiteSpace: "pre-line" }}>{highlights}</p>
          ) : (
            <p className="text-muted-foreground">No highlights available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDescription;
