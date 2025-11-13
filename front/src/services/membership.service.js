import { apiClient } from './api-client';

export const upgradeMembershipService = async () => {
    try {
        const response = await apiClient.post('/membership/upgrade');
        return response.data;
    } catch (error) {
        console.error('No se pudo cambiar el plan:', error);
        throw error;
    }
};