import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const LoadingSpinner: React.FC = () => {
  return (
    <Flex direction="column" justify="center" align="center" py="10">
      <Spinner
        size="xl"
        color="teal.500"
        css={{
          borderWidth: '4px',
          borderColor: 'gray.200',
          borderTopColor: 'teal.500',
          animation: 'spin 0.65s linear infinite',
        }}
      />
      <Text mt="4" color="gray.600">
        Loading...
      </Text>
    </Flex>
  );
};

export default LoadingSpinner;