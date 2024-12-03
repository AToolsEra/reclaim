import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "./form";
import ReclaimDemo from "@/components/Reclaim";
import { useState } from "react";

interface ProfessionalDetailsStepProps {
  form: UseFormReturn<FormData>;
}

export function ProfessionalDetailsStep({ form }: ProfessionalDetailsStepProps) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Professional details</h2>
        <p className="text-muted-foreground">Please provide your professional profiles and website.</p>
      </div>
      <FormField
        control={form.control}
        name="professionalDetails.githubProfile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GitHub Profile</FormLabel>
            <FormControl>
              <>
                <ReclaimDemo
                  onVerify={(ghUrl) => {
                    field.onChange(ghUrl);
                  }}
                  loading={loading}
                  setLoading={setLoading}
                />
                {field.value && <Input readOnly placeholder="https://github.com/username" {...field} />}
              </>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="professionalDetails.twitterHandle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twitter Handle</FormLabel>
            <FormControl>
              <Input placeholder="@username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="professionalDetails.telegramUsername"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telegram Username</FormLabel>
            <FormControl>
              <Input placeholder="@username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="professionalDetails.personalWebsite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Personal Website</FormLabel>
            <FormControl>
              <Input placeholder="https://yourwebsite.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default ProfessionalDetailsStep;
