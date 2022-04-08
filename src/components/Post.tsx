import {Avatar} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import "./Post.css";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import {MoreHorizOutlined, ShareOutlined} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../reducer/userSlice";
import Modal from "react-modal";
import db from "../firebase";
import {selectQuestionId, setQuestionInfo} from "../reducer/questionSlice";
import firebase from "firebase";
import {FiEdit} from "react-icons/fi";
import {ImArrowDown2, ImArrowUp2} from "react-icons/im";
import {BiShowAlt} from "react-icons/bi";

interface Props {
    data: any;
}

const Post: React.FC<Props> = function ({data}) {
    const {question, imageUrl, timestamp} = data?.questions;
    const {id} = data;
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer] = useState("");
    const [getAnswers, setGetAnswers] = useState<any[]>();
    const [like, setLike] = useState<any[]>([]);
    const [liked, setLiked] = useState(false);

    const [likeUid, setLikeUid] = useState();

    useEffect(() => {
        if (questionId) {
            db.collection("questions")
                .doc(questionId)
                .collection("answer")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setGetAnswers(snapshot.docs.map((doc) => ({...doc, id: doc.id, answers: doc.data()})))
                );
        }
    }, [questionId]);

    useEffect(() => {
        db.collection("questions")
            .doc(id)
            .collection("like")
            .onSnapshot((snapshot: any) => {
                setLike(
                    snapshot.docs.map((doc: any) => {
                        if (doc.data().user.uid === user?.uid) {
                            setLikeUid(doc.id);
                            setLiked(true);
                        }
                        console.log(doc.id, "data");
                        return {...doc.data().user};
                    })
                );
            });
    }, []);

    const handleLike = () => {
        if (!liked) {
            db.collection("questions").doc(id).collection("like").add({
                user: user,
            });
            setLiked(true);
        } else {
            db.collection("questions").doc(id).collection("like").doc(likeUid).delete();
            setLiked(false);
        }
    };

    const handleAnswer = (e: any) => {
        e.preventDefault();

        if (questionId) {
            db.collection("questions").doc(questionId).collection("answer").add({
                user: user,
                answer: answer,
                questionId: questionId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        console.log(questionId);
        setAnswer("");
        setIsModalOpen(false);
    };
    return (
        <div className="post w-full cursor-pointer">
            <div className="post__info">
                <Avatar
                    src={
                        data?.questions?.user?.photo ||
                        "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
                    }
                />
                <small className="text-gray-700">
                    {data?.questions?.user?.displayName || "Guest"}
                    <br />
                    {new Date(timestamp?.toDate()).toLocaleString()}{" "}
                </small>
            </div>
            <div className="post__body break-words	 whitespace-normal w-full">
                <div className="post__question flex justify-between break-words	 whitespace-normal w-full">
                    <p className="break-words 	 whitespace-normal w-full">{question}</p>

                    <Modal
                        isOpen={IsmodalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        shouldCloseOnOverlayClick={false}
                        style={{
                            overlay: {
                                width: 680,
                                height: 550,
                                backgroundColor: "rgba(0,0,0,0.8)",
                                zIndex: 1000,
                                top: "50%",
                                left: "50%",
                                marginTop: "-250px",
                                marginLeft: "-350px",
                            },
                        }}
                    >
                        <div className="modal__question">
                            <h1>{question}</h1>
                            <p>
                                asked by <span className="name"></span> {""}
                                on <span className="name">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                            </p>
                        </div>
                        <div className="modal__answer">
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter Your Answer"
                            />
                        </div>
                        <div className="modal__button">
                            <button className="cancle" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit" onClick={handleAnswer} className="add">
                                Add Answer
                            </button>
                        </div>
                    </Modal>
                </div>
                <img src={imageUrl} alt="" />

                <div className="post__answer">
                    {getAnswers?.map(({answers}) => (
                        <p key={answers.id} style={{position: "relative", paddingBottom: "5px"}}>
                            {id === answers.questionId ? (
                                <span className="w-full">
                                    {answers.answer}
                                    <br />
                                    <span
                                        style={{
                                            position: "absolute",
                                            color: "gray",
                                            fontSize: "small",
                                            display: "flex",
                                            right: "0px",
                                        }}
                                    >
                                        <span className="text-gray-600">
                                            Answered By {answers.user.displayName} on{" "}
                                            {new Date(answers.timestamp?.toDate()).toLocaleString()}
                                        </span>
                                    </span>
                                </span>
                            ) : (
                                ""
                            )}
                        </p>
                    ))}
                </div>
            </div>
            <div className="post__footer flex flex-row space-x-3 ">
                <div className="post__footerAction bg-gray-200 px-3 py-1  flex flex-row space-x-3">
                    <ImArrowUp2 className={liked ? "text-blue-500" : ""} onClick={() => handleLike()} />
                    {like.length}
                    <ImArrowDown2 />
                </div>

                {/* <RepeatOutlinedIcon /> */}

                <ChatBubbleOutlineOutlinedIcon />
                <button
                    onClick={() =>
                        dispatch(
                            setQuestionInfo({
                                questionId: id,
                                questionName: question,
                            })
                        )
                    }
                    className="self-end self-content-end  text-black font-semibold p-2 hover:bg-gray-300 bg-gray-100 rounded-3xl flex flex-row items-center"
                >
                    <BiShowAlt className="inline-block text-blue-500 mr-2" />
                    Show All Answers
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="self-end self-content-end text-black font-semibold p-2 hover:bg-gray-300 bg-gray-100 rounded-3xl flex flex-row items-center"
                >
                    <FiEdit className="inline-block text-blue-500 mr-2" /> Answer
                </button>

                {/* <div className="post__footerLeft">
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div> */}
            </div>
        </div>
    );
};

export default React.memo(Post);
