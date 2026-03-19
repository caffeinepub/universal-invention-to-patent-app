import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { InventionProject, InventionProjectInput, InventionStatus } from '../backend';

export function useGetAllProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<InventionProject[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProject(projectId: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<InventionProject>({
    queryKey: ['project', projectId.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProject(projectId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMostRecentProject() {
  const { actor, isFetching } = useActor();
  return useQuery<InventionProject | null>({
    queryKey: ['mostRecentProject'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMostRecentlyUpdatedProject();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProjectsByStatus(status: InventionStatus) {
  const { actor, isFetching } = useActor();
  return useQuery<InventionProject[]>({
    queryKey: ['projectsByStatus', status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjectsByStatus(status);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: InventionProjectInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProject(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['mostRecentProject'] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ projectId, input }: { projectId: bigint; input: InventionProjectInput }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProject(projectId, input);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['mostRecentProject'] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteProject(projectId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['mostRecentProject'] });
    },
  });
}
