import React, {useEffect, useState} from "react";
import QuorBox from "./QuorBox";
import "./Feed.css";
import Post from "./Post";
import db from "../firebase";

function Feed() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        db.collection("questions")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setPosts(
                    snapshot.docs.map((doc) => ({
                        ...doc,
                        id: doc.id,
                        questions: doc.data(),
                    }))
                )
            );
    }, []);

    return (
        <div className=" feed md:w-8/12 w-full">
            <QuorBox />
            {posts.map((post, index) => (
                <Post key={index} data={post} />
            ))}
        </div>
    );
}

export default Feed;
