import { Card, Row, Text } from '@nextui-org/react'
import React from 'react'
import { BiDownvote, BiUpvote } from 'react-icons/bi'

function Query() {
  return (
    <>
      <Card variant="bordered" isHoverable className='shrink-0'>
        <Card.Header><Text>Query Title</Text></Card.Header>
        <Card.Divider />
        <Card.Body>
          <Row>
            <div className="w-[10vw] h-[10vh] rounded-sm overflow-hidden mx-5">
              <Card.Image src="/images/cardbg.jpg" alt="QueryPic" width='100%' height="100%" objectFit='fill' />
            </div>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, rerum. Ducimus magni minima sit a debitis quos repudiandae quas odio vitae illo nesciunt aliquam, quibusdam tempore eaque impedit! Repellendus, corporis!</Text>
          </Row>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <div className='flex flex-row gap-4 w-full justify-around'>
            <div className='flex flex-row gap-2 items-center'>
              <Text>Posted By:</Text>
              <Text>Username</Text>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <Text>Posted On:</Text>
              <Text>Date</Text>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <BiUpvote className='text-black text-xl' />
              <Text>1234 Upvotes</Text>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <BiDownvote className='text-black text-xl' />
              <Text>4321 Downvotes</Text>
            </div>
            <Text className="text-right">Read More...</Text>
          </div>
        </Card.Footer>
      </Card>
    </>
  )
}

export default Query