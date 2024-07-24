import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useImageURL = (imageName) =>  {

    const [ url, setURL ] = useState();
    const axioPrivate = useAxiosPrivate();
    useEffect(() => {
        const handleImage = async (imageName) =>  {
            try {
                const response = await axioPrivate.get(`/images/${imageName.split('/')[0]}+${imageName.split('/')[1]}`);
                setURL(response.data);
            } catch(err) {
                console.error(err);
                return {"ERROR": "Could not find image URL."};
            }
        }
        handleImage(imageName);
    }, [])
    return url;
}

export default useImageURL;