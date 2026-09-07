import { Alert, Platform } from 'react-native';

/**
 * Cross-platform confirmation dialog.
 * Alert.alert is a no-op on web, so we fall back to window.confirm there.
 */
export function confirmDialog(
  title: string,
  message: string,
  confirmLabel: string,
  onConfirm: () => void,
  destructive = false
): void {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmLabel, style: destructive ? 'destructive' : 'default', onPress: onConfirm },
  ]);
}

/**
 * Cross-platform informational dialog.
 */
export function infoDialog(title: string, message: string, label = 'OK', onPress?: () => void): void {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      window.alert(`${title}\n\n${message}`);
    }
    onPress?.();
    return;
  }
  Alert.alert(title, message, [{ text: label, onPress }]);
}
