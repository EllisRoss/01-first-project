import React from 'react';
import styles from './Users.module.css';

const _ava = 'https://steamuserimages-a.akamaihd.net/ugc/250339495850728821/5F2735053134AC2FE8429D935FC70E7D7037F2C8/';

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
                {
                    id: 1,
                    photoUrl: _ava,
                    followed: true,
                    userName: 'Nastya',
                    status: 'Kitty',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 2,
                    photoUrl: _ava,
                    followed: false,
                    userName: 'Tony',
                    status: 'Lazanya',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 3,
                    photoUrl: _ava,
                    followed: false,
                    userName: 'Mark',
                    status: 'gg wp',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 4,
                    photoUrl: _ava,
                    followed: false,
                    userName: 'Alfred',
                    status: ';)',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 5,
                    photoUrl: _ava,
                    followed: false,
                    userName: 'James',
                    status: 'i like football',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 6,
                    photoUrl: _ava,
                    followed: false,
                    userName: 'Nastya',
                    status: 'I am a boss',
                    location: {city: 'Minsk', country: 'Belarus'}
                },
            ]
        )
    }

    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.userName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;