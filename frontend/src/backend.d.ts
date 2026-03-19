import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProjectId = bigint;
export interface InventionProject {
    id: ProjectId;
    claims: string;
    status: InventionStatus;
    aiAnalysis?: AIAnalysis;
    title: string;
    features: string;
    ownerId: string;
    createdAt: bigint;
    updatedAt: bigint;
    solution: string;
    problem: string;
}
export interface InventionProjectInput {
    claims: string;
    status: InventionStatus;
    aiAnalysis?: AIAnalysis;
    title: string;
    features: string;
    ownerId: string;
    solution: string;
    problem: string;
}
export interface AIAnalysis {
    suggestions: Array<string>;
    readinessScore: bigint;
    noveltyChecklist: Array<string>;
}
export enum InventionStatus {
    submitted = "submitted",
    readyToSubmit = "readyToSubmit",
    inReview = "inReview",
    draft = "draft"
}
export interface backendInterface {
    createProject(input: InventionProjectInput): Promise<ProjectId>;
    deleteProject(projectId: ProjectId): Promise<void>;
    getAllProjects(): Promise<Array<InventionProject>>;
    getMostRecentlyUpdatedProject(): Promise<InventionProject | null>;
    getProject(projectId: ProjectId): Promise<InventionProject>;
    getProjectsByStatus(status: InventionStatus): Promise<Array<InventionProject>>;
    updateProject(projectId: ProjectId, input: InventionProjectInput): Promise<void>;
}
