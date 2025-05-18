import {type ToggleFollowUserRequest, UsersApi, type UserUpdateInput} from 'generated-client';
import { useCallback } from 'react';

const usersApi = new UsersApi();

export const useUserApi = () => {
    const getUser = useCallback(async (id: string) => {
        return usersApi.getUser({ id });
    }, []);

    const deleteUser = useCallback(async (id: string) => {
        return usersApi.deleteUser({ id });
    }, []);

    const updateUser = useCallback(async (id: string, input: UserUpdateInput) => {
        return usersApi.updateUser({ id, userUpdateInput: input });
    }, []);

    const getUserActivities = useCallback(async () => {
        return usersApi.getUserActivities();
    }, []);

    const getUsersComment = useCallback(async (pageId: string) => {
        return usersApi.getUsersComment({ pageId });
    }, []);

    const getUsersReaction = useCallback(async (pageId: string, emoji?: string) => {
        return usersApi.getUsersReaction({ pageId, emoji });
    }, []);

    const searchUsers = useCallback(async (query: string) => {
        return usersApi.searchUsers({ query });
    }, []);

    const toggleFollowUser = useCallback(async (id: string, follow: boolean) => {
        const toggleFollowUserRequest: ToggleFollowUserRequest = { follow };
        return usersApi.toggleFollowUser({ id, toggleFollowUserRequest });
    }, []);

    return {
        getUser,
        deleteUser,
        updateUser,
        getUserActivities,
        getUsersComment,
        getUsersReaction,
        searchUsers,
        toggleFollowUser,
    };
};
