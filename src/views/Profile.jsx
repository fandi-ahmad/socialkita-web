import React from 'react'
import { Navbar } from '../components/Navbar'
import { SimpleInput } from '../components/baseInput'
import { ProfileCard } from '../components/ProfileCard'
import profilePicture from '../assets/images/blank-profile-picture.png'


const Profile = () => {
  return (
    <>
      <Navbar/>
      <div className='px-20 pt-10 flex flex-row'>
        <div className="avatar">
          <div className="w-72 h-72 rounded-full">
            <img src={profilePicture} />
          </div>
        </div>

        <ProfileCard className=''
          username='fandi224'
          fullname='fandi ahmad'
          category='fullstack developer'
          button={<button className="btn btn-sm btn-primary">Edit profile</button>}
          address='kota palu'
          work='PT jaya harapan'
          link='youtube.com'
          biodata='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, dolore. Beatae, nihil fugit enim aliquam quam, quibusdam perspiciatis esse numquam laborum veritatis necessitatibus tempora modi, praesentium repellat voluptatem rerum vero!'
        />

        <ProfileCard className='hidden'
          username={<SimpleInput placeholder='username' />}
          fullname={<SimpleInput placeholder='full name' />}
          category={<SimpleInput placeholder='category' />}
          button={<button className="btn btn-sm btn-primary">save</button>}
          address={<SimpleInput placeholder='alamat' />}
          work={<SimpleInput placeholder='tempat kerja' />}
          link={<SimpleInput placeholder='link' />}
          biodata={<textarea placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full h-64 no-resize"></textarea>}
        />


      </div>
    </>
  )
}

export default Profile