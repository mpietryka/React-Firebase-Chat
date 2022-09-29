import React, {useRef, useEffect} from 'react'
import Moment from 'react-moment'

export const Message = ( {msg, user1} ) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    },[msg]);

  return (
    <div className={`p-3 mb-3   ${msg.from === user1 ? `text-right` : `text-left`}`} 
    ref={scrollRef}>
        <p className={`p-4 rounded-xl max-w-md inline-block text-left border border-1 border-gray-400  ${msg.from === user1 ? `bg-blue-500` :`bg-base-200`}`}>
            {msg.text}
        <br/>
        <small className="inline-block font-light text-left mt-1">
            <Moment fromNow>{msg.sentAt.toDate()}</Moment>
        </small>
            </p>
    </div>
  )
}
