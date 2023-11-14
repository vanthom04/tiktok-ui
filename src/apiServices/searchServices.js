import * as request from '~/utils/request';

export const search = async (query, type = 'less') => {
  try {
    const response = await request.get('users/search', {
      params: {
        q: query,
        type: 'less',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
