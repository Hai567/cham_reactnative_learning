import type { MemoryProject } from "@/domain/project";

export const sampleProjects: MemoryProject[] = [
	{
		id: "1",
		status: "draft",
	},
	{
		id: "2",
		status: "media_ready",
		photo: {
			id: "1",
			uri: "link",
			width: 1280,
			height: 980,
		},
		video: {
			id: "1",
			uri: "link",
			durationSeconds: 20,
			fileSizeBytes: 20_000,
			mimeType: "video/mp4",
			uploadStatus: "uploaded",
		},
	},
	{
		id: "3",
		status: "cancelled",
		reason: "Don't like it",
		cancelledAt: new Date("2026-10-01T08:51:00.000Z"),
	},
];

export function findSampleProject(id: string): MemoryProject | undefined {
	return sampleProjects.find((prj) => prj.id === id);
}
