import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
  Text,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import color from '../constants/color';

interface TextFieldProps extends TextInputProps {
  needIcon?: boolean;
  icon?: any;
  showCancel?: boolean;
  onCancel?: () => void;
  value: string;

  onChangeText: (text: string) => void;
  placeholderSize?: number;

  showBorder?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  needIcon = true,
  icon = faSearch,
  showCancel = true,
  onCancel,
  value,
  onChangeText,
  placeholderSize = 16,
  showBorder = false,
  style,
  ...props
}) => {
  const handleCancel = () => {
    onChangeText('');
    onCancel?.();
  };

  return (
    <View style={[styles.container, showBorder && styles.bottomBorderDesign]}>
      {needIcon && (
        <FontAwesomeIcon icon={icon} size={18} style={styles.icon} />
      )}
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={color.placeHolderColor}
        style={[
          styles.input,
          styles.placeHolder,
          { fontSize: placeholderSize },
          style,
        ]}
      />

      {showCancel && value.length > 0 && (
        <Pressable onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 8,
  },
  bottomBorderDesign: {
    borderBottomColor: color.placeHolderColor,
    borderBottomWidth: 2,
    borderRadius : 0,
  },
  placeHolder: {
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
    color: color.placeHolderColor,
  },
  input: {
    flex: 1,
    color: color.primary,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 6,
  },
  cancelText: {
    color: color.cancleColor,
    fontSize: 14,
    fontWeight: '600',
  },
});
