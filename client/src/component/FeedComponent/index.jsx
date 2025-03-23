import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFeed } from "../../store/feedSlice";

const FeedComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Dispatching fetchFeed...");
        dispatch(fetchFeed());
    }, [dispatch]);

    return <div>Loading feed...</div>;
};

export default FeedComponent;



