import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Link, List, ListItem, Spinner, Text } from '@chakra-ui/react';

const HackerNews = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const top10StoryIds = storyIds.slice(0, 10);

        const storyPromises = top10StoryIds.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );

        const stories = await Promise.all(storyPromises);
        setStories(stories);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={6}>Hacker News Top Stories</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <List spacing={4}>
          {stories.map(story => (
            <ListItem key={story.id} p={4} borderWidth="1px" borderRadius="md">
              <Link href={story.url} isExternal fontSize="xl" fontWeight="bold">
                {story.title}
              </Link>
              <Text mt={2}>By: {story.by}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default HackerNews;