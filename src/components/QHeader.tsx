import React, {useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import Modal from "react-modal";

import "./QHeader.css";
import {Avatar, Button, Input} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "../reducer/userSlice";
import db, {auth} from "../firebase";
import {ExpandMore, Link} from "@material-ui/icons";
import firebase from "firebase";
import LogoutBar from "./auth/LogoutBar";
import DarkMode from "./DarkMode";

Modal.setAppElement("#root");

function QHeader() {
    const user = useSelector(selectUser);

    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const questionName = input;

    const handleQuestion = (e: any) => {
        e.preventDefault();
        setIsModalOpen(false);

        if (questionName) {
            db.collection("questions").add({
                user: user,
                question: input,
                imageUrl: inputUrl,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }

        setInput("");
        setInputUrl("");
    };

    return (
        <div className="qHeader">
            <div className="qHeader__logo">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
                    alt=""
                />
            </div>
            {/* <div className="qHeader__icons">
                <div className="active qHeader__icon">
                    <HomeIcon />
                </div>
                <div className="qHeader__icon">
                    <FeaturedPlayListOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <AssignmentTurnedInOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <PeopleAltOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <NotificationsOutlinedIcon />
                </div>
            </div> */}
            <div className="qHeader__input">
                <SearchIcon />
                <input type="text" placeholder="Search Quora" />
            </div>
            <div className="qHeader__Rem">
                <div className="qHeader__avatar">
                    <LogoutBar logout={() => auth.signOut()}>
                        <Avatar
                            // onClick={() => auth.signOut()}
                            className="Avatar"
                            src={
                                user && user.photo
                                    ? user?.photo
                                    : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
                            }
                        />
                    </LogoutBar>
                </div>
                <LanguageIcon />
                <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
                <Modal
                    isOpen={IsmodalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    shouldCloseOnOverlayClick={false}
                    style={{
                        overlay: {
                            width: 700,
                            height: 600,
                            backgroundColor: "rgba(0,0,0,0.8)",
                            zIndex: 1000,
                            top: "50%",
                            left: "50%",
                            marginTop: "-300px",
                            marginLeft: "-350px",
                        },
                    }}
                >
                    <div className="modal__title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal__info">
                        <Avatar
                            className="avatar"
                            src={
                                user?.photo
                                    ? user?.photo
                                    : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
                            }
                        />
                        <p>{user?.displayName ? user?.displayName : user?.email} asked</p>
                        <div className="modal__scope">
                            <PeopleAltOutlinedIcon />
                            <p>Public</p>
                            <ExpandMore />
                        </div>
                    </div>
                    <form onSubmit={(e) => handleQuestion(e)}>
                        <div className="modal__Field">
                            <textarea
                                className="border-2"
                                rows={7}
                                required
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Start your question with 'What', 'How', 'Why', etc. "
                            />
                            <div className="modal__fieldLink">
                                <Link />
                                <input
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    type="text"
                                    placeholder="Optional: inclue a link that gives context"
                                ></input>
                            </div>
                        </div>
                        <div className="modal__buttons">
                            <button className="cancle" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="add">
                                Add Question
                            </button>
                        </div>
                    </form>
                </Modal>
                <DarkMode />
            </div>
        </div>
    );
}

export default QHeader;
