import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Rsvp, User } from "@shared/schema";

type PublicMember = Omit<User, "passwordHash">;

const profileSchema = z.object({
  displayName: z.string().min(1, "Name is required").max(100),
  affiliation: z.string().max(200).optional(),
  bio: z.string().max(1000).optional(),
  researchInterests: z.string().max(500).optional(),
  websiteUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  scholarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  profileImageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isPublic: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function EditProfileSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery<PublicMember>({
    queryKey: ["/api/profile"],
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
      affiliation: "",
      bio: "",
      researchInterests: "",
      websiteUrl: "",
      linkedinUrl: "",
      scholarUrl: "",
      profileImageUrl: "",
      isPublic: false,
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        displayName: profile.displayName || "",
        affiliation: profile.affiliation || "",
        bio: profile.bio || "",
        researchInterests: profile.researchInterests || "",
        websiteUrl: profile.websiteUrl || "",
        linkedinUrl: profile.linkedinUrl || "",
        scholarUrl: profile.scholarUrl || "",
        profileImageUrl: profile.profileImageUrl || "",
        isPublic: profile.isPublic ?? false,
      });
    }
  }, [profile]);

  const saveMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      await apiRequest("PUT", "/api/profile", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/members"] });
      toast({ title: "Profile updated" });
    },
    onError: (err: any) => {
      toast({ variant: "destructive", title: "Save failed", description: err.message });
    },
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground py-4">Loading profile...</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((d) => saveMutation.mutate(d))} className="space-y-5">

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="displayName" render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} data-testid="input-display-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="affiliation" render={({ field }) => (
            <FormItem>
              <FormLabel>Affiliation</FormLabel>
              <FormControl>
                <Input placeholder="University / Organization" {...field} value={field.value ?? ""} data-testid="input-affiliation" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="bio" render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea rows={3} placeholder="A short description of your background and work..." {...field} value={field.value ?? ""} data-testid="input-bio" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="researchInterests" render={({ field }) => (
          <FormItem>
            <FormLabel>Research Interests</FormLabel>
            <FormControl>
              <Textarea rows={2} placeholder="e.g. AI ethics, critical pedagogy, algorithmic fairness" {...field} value={field.value ?? ""} data-testid="input-research-interests" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="websiteUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://yoursite.com" {...field} value={field.value ?? ""} data-testid="input-website" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="linkedinUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://linkedin.com/in/..." {...field} value={field.value ?? ""} data-testid="input-linkedin" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="scholarUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>Google Scholar</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://scholar.google.com/..." {...field} value={field.value ?? ""} data-testid="input-scholar" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="profileImageUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://..." {...field} value={field.value ?? ""} data-testid="input-profile-image" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="isPublic" render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-3 p-4 rounded-lg border border-card-border bg-card">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="switch-is-public"
                />
              </FormControl>
              <div>
                <FormLabel className="cursor-pointer">Show my profile in the member directory</FormLabel>
                <p className="text-xs text-muted-foreground mt-0.5">
                  When enabled, your profile will appear publicly on the People page.
                </p>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-profile">
            {saveMutation.isPending ? "Saving..." : "Save Profile"}
          </Button>
          {profile?.isPublic && profile?.username && (
            <Link href={`/people/${profile.username}`}>
              <Button variant="outline" size="sm" type="button" data-testid="button-view-profile">
                View Public Profile
              </Button>
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
}

export default function PortalPage() {
  const [, navigate] = useLocation();
  const { user, isLoading, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading]);

  const { data: rsvps = [] } = useQuery<Rsvp[]>({
    queryKey: ["/api/rsvps/mine"],
    enabled: !!user,
  });

  const cancelRsvp = useMutation({
    mutationFn: async (eventId: number) => {
      await apiRequest("DELETE", `/api/events/${eventId}/rsvp`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rsvps/mine"] });
      toast({ title: "RSVP cancelled" });
    },
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading || !user) return null;

  return (
    <div className="space-y-0">
      <div className="mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          Member Portal
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-3">
          Welcome, {user.displayName}
        </h1>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="no-default-active-elevate capitalize">
            {user.role}
          </Badge>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      </div>

      {/* Admin shortcut */}
      {user.role === "admin" && (
        <>
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-6 mb-8">
            <p className="text-sm font-semibold text-foreground mb-1">Admin Access</p>
            <p className="text-xs text-muted-foreground mb-4">
              You have administrator privileges. Access the dashboard to manage submissions, events, publications, and site content.
            </p>
            <Link href="/admin">
              <Button size="sm" data-testid="button-go-admin">Go to Admin Dashboard</Button>
            </Link>
          </div>
          <Separator className="my-10" />
        </>
      )}

      {/* My RSVPs */}
      <section data-testid="section-my-rsvps">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
            Your Schedule
          </p>
          <h2 className="font-serif text-2xl font-bold text-foreground">My Event RSVPs</h2>
        </div>

        {rsvps.length === 0 ? (
          <div className="rounded-xl border border-card-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              You haven&apos;t RSVPed to any events yet.
            </p>
            <Link href="/events">
              <Button variant="outline" size="sm">Browse Events</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {rsvps.map((rsvp) => (
              <div
                key={rsvp.id}
                className="flex items-center justify-between p-4 rounded-lg border border-card-border bg-card"
                data-testid={`row-rsvp-${rsvp.id}`}
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">Event #{rsvp.eventId}</p>
                  <p className="text-xs text-muted-foreground">
                    RSVP confirmed &middot; {new Date(rsvp.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => cancelRsvp.mutate(rsvp.eventId)}
                  disabled={cancelRsvp.isPending}
                  data-testid={`button-cancel-rsvp-${rsvp.id}`}
                >
                  Cancel
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Separator className="my-12" />

      {/* Edit Profile */}
      <section data-testid="section-edit-profile">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
            Your Profile
          </p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Edit Profile</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Update your public-facing information. Toggle visibility to appear in the member directory.
          </p>
        </div>
        <EditProfileSection />
      </section>

      <Separator className="my-12" />

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleLogout}
          data-testid="button-logout"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
