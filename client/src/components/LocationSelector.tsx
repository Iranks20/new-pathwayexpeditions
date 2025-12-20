import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { sortedDistricts, type UgandaDistrict } from "@shared/data/ugandaDistricts";

interface LocationSelectorProps {
  label: string;
  value: string;
  onChange: (districtId: string) => void;
  required?: boolean;
}

export default function LocationSelector({
  label,
  value,
  onChange,
  required = false,
}: LocationSelectorProps) {
  const selectedDistrict = sortedDistricts.find((dist) => dist.id === value);

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, "-")}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange} required={required}>
        <SelectTrigger id={label.toLowerCase().replace(/\s+/g, "-")}>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {sortedDistricts.map((district) => (
            <SelectItem key={district.id} value={district.id}>
              <div className="flex items-center justify-between w-full">
                <span>{district.name}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {district.region}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedDistrict && (
        <p className="text-xs text-muted-foreground">
          {selectedDistrict.region} Region
        </p>
      )}
    </div>
  );
}

export { sortedDistricts, type UgandaDistrict };

