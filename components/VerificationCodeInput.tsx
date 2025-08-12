import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface VerificationCodeInputProps {
  codeLength?: number;
  onFulfill: (code: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
  autoFocus?: boolean;
}

export default function VerificationCodeInput({
  codeLength = 4,
  onFulfill,
  keyboardType = 'number-pad',
  autoFocus = true,
}: VerificationCodeInputProps) {
  const [code, setCode] = React.useState<string[]>(Array(codeLength).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputs.current[0]) {
      inputs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleTextChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < codeLength - 1) {
      inputs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join('');
    if (fullCode.length === codeLength) {
      onFulfill(fullCode);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: codeLength }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={styles.input}
          value={code[index]}
          onChangeText={(text) => handleTextChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType={keyboardType}
          maxLength={1}
          textAlign="center"
          autoFocus={index === 0 && autoFocus}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 280,
    alignSelf: 'center',
  },
  input: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
});
