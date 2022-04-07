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
                        id: doc.id,
                        questions: doc.data(),
                    }))
                )
            );
    }, []);

    return (
        <div className=" feed">
            <div className="bg-black h-20 w-full"></div>

            <QuorBox />
            {posts.map((post, key) => (
                <Post key={key} data={post} />
            ))}
        </div>
    );
}

export default Feed;
