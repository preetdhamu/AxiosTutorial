import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/color';

interface Props {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const CommonErrorDialog: React.FC<Props> = ({ visible, message, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Oops!</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommonErrorDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
