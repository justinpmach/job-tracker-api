import { prisma } from "../config/database";
import { ApplicationStatus } from "@prisma/client";

export interface ApplicationInput {
  company: string;
  role: string;
  status?: ApplicationStatus;
  appliedDate: Date;
  notes?: string;
}

export async function createApplication(
  userId: number,
  data: ApplicationInput
) {
  return prisma.application.create({
    data: {
      userId,
      company: data.company,
      role: data.role,
      status: data.status ?? "APPLIED",
      appliedDate: data.appliedDate,
      notes: data.notes,
    }
  })
}

export interface ListOptions {
  status?: string;
  company?: string;
  sortBy?: "appliedDate" | "createdAt";
  order?: "asc" | "desc";
}

export async function getApplications(
  userId: number,
  options: ListOptions = {}
) {
  const where: any = { userId };
  if (options.status) where.status = options.status;
  if (options.company) where.company = { contains: options.company, mode: "insensitive" };

  return prisma.application.findMany({
    where,
    orderBy: {
      [options.sortBy!]: options.order
    },
  });
}
// export async function getApplications(userId: number) {
//   return prisma.application.findMany({
//     where: { userId },
//     orderBy: { appliedDate: "desc" },
//   });
// }

export async function getApplicationById(userId: number, id: number) {
  return prisma.application.findFirst({
    where: { id, userId },
  });
}

export async function updateApplication(userId: number, id: number, data: Partial<ApplicationInput>) {
  // Ensure the record belongs to this user
  await prisma.application.findFirstOrThrow({ where: { id, userId } });

  return prisma.application.update({
    where: { id },
    data: {
      company: data.company,
      role: data.role,
      status: data.status,
      appliedDate: data.appliedDate,
      notes: data.notes
    }
  })
}

export async function deleteApplication(userId: number, id: number) {
  await prisma.application.findFirstOrThrow({ where: { id, userId } });

  return prisma.application.delete({ where: { id } });
} 