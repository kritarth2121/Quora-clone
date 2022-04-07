import {Avatar} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import "./Post.css";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import {MoreHorizOutlined, ShareOutlined} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../reducer/userSlice";
import Modal from "react-modal";
import db from "../firebase";
import {selectQuestionId, setQuestionInfo} from "../reducer/questionSlice";
import firebase from "firebase";

interface Props {
    data: any;
}

const Post: React.FC<Props> = function ({data}) {
    const {Id, question, imageUrl, timestamp, users} = data;
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer] = useState("");
    const [getAnswers, setGetAnswers] = useState<any[]>();

    useEffect(() => {
        if (questionId) {
            db.collection("questions")
                .doc(questionId)
                .collection("answer")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setGetAnswers(snapshot.docs.map((doc) => ({id: doc.id, answers: doc.data()})))
                );
        }
    }, [questionId]);

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
        <div
            className="post"
            onClick={() =>
                dispatch(
                    setQuestionInfo({
                        questionId: Id,
                        questionName: question,
                    })
                )
            }
        >
            <div className="post__info">
                <Avatar />
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            <div className="post__body">
                <div className="post__question">
                    <p>{question}</p>
                    <button onClick={() => setIsModalOpen(true)} className="post__btnAnswer">
                        Answer
                    </button>
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
                <div className="post__answer">
                    {getAnswers?.map(({id, answers}) => (
                        <p key={id} style={{position: "relative", paddingBottom: "5px"}}>
                            {Id === answers.questionId ? (
                                <span>
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
                                        <span style={{color: "#b92b27"}}>
                                            Anonymous
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
                <img src={imageUrl} alt="" />
            </div>
            <div className="post__footer">
                <div className="post__footerAction">
                    <ArrowUpwardOutlinedIcon />
                    <ArrowDownwardOutlinedIcon />
                </div>

                <RepeatOutlinedIcon />
                <ChatBubbleOutlineOutlinedIcon />
                <div className="post__footerLeft">
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Post);
