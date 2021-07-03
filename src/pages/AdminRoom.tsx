// import { FormEvent, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuths';
import { useRoom } from '../hooks/useRoom';
// import { database } from '../services/firebase';

import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss'




type RoomParams = {
    id: string; 
}

export function AdminRoom() {
    // const { user } = useAuth();
    const history = useHistory();

    const params = useParams<RoomParams>();
    // const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;


    const { title, questions } = useRoom(roomId);

    async function handleCloseRoom() {

        await database.ref(`rooms/${roomId}`).update({ 
            endedAt: new Date(),
        })

        history.push('/')
        
    }
   

    async function handleDeletedQuestion(questionId: string) {
        if (window.confirm('Are you sure you want to delete?')) {
             await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAnswered(questionId: string){

        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });


    }

    async function handleHighlightQuestion(questionId: string) {

        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });

    }


    
    return (
       <div id="page-room">
        <header>
            <div className="content">
            <Link to="/"> <img src={logoImg} alt="Letmeask" /> </Link>
                <div className="">
                <RoomCode code={roomId}/>

                <Button isOutlined
                onClick={handleCloseRoom}
                >
                    Close room
                    </Button>
                </div>

            </div>
        </header>

        <main>

            <div className="room-title">
                <h1>
                    Room {title}
                </h1>

                {questions.length > 0 && <span>{questions.length} question(s)</span> }

                
            </div>

           

            <div className="question-list">

            {questions.map(question => {
                return (
                    <Question 

                    key={question.id}
                    content={question.content}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighlighted={question.isHighlighted}

                    >
                        
                      { !question.isAnswered && (

                          <>
                            <button     
                            type="button"
                            onClick={() => handleCheckQuestionAnswered(question.id)}
                            >
                            <img src={checkImg} alt="Mark as answered question icon" />
                            </button>

                            <button
                            type="button"
                            onClick={() => handleHighlightQuestion(question.id)}
                            >
                            <img src={answerImg} alt="Highlight question icon" />
                            </button>
                          </>

                      ) }

                        <button
                            type="button"
                            onClick={() => handleDeletedQuestion(question.id)}
                        >
                            <img src={deleteImg} alt="Delete question icon" />
                        </button>
                       

                        </Question>
                )
            })}

            </div>

        </main>

       </div>
    )
}