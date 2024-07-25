import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useImageURL = (imageName) =>  {

    const axioPrivate = useAxiosPrivate();
    const handleImage = async (imageName) =>  {
        if (imageName != null) {
            try {
                const response = await axioPrivate.get(`/images/${imageName.split('/')[0]}+${imageName.split('/')[1]}`);
                return response.data;
            } catch(err) {
                console.log(err);
                return;
            }
        }
    }
    return handleImage;
}

export default useImageURL;