import { TSnackbarProps } from '../../shared/models/ihm/snackbar.model';
import { Container, Row, Col, Card, Text, Button } from '@nextui-org/react';
import { TickSquare } from 'react-iconly';

export default function Snackbar({ open, text, icon: Icon, handleClose, variant }: TSnackbarProps) {
  return open ? (
    <>
      <Container css={{ paddingTop: '$10' }}>
        <Card css={{ $$cardColor: variant }}>
          <Card.Body>
            <Row justify='space-between' align='center'>
              <Text h6 size={18} color='white' css={{ m: 0 }}>
                {text}
              </Text>
              <Button light css={{ color: 'white' }} onClick={handleClose}>
                <TickSquare set='curved' size={'medium'} primaryColor='white' />{' '}
              </Button>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : null;
}
