import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types';
import styles from '../styles/home-styles';

type NavbarProps = {
  setModalVisible: (visible: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ setModalVisible }) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.navbar}>
      {Platform.OS === 'web' && (
        <Text style={styles.title}>Pastillero</Text>
      )}
      {Platform.OS === 'android' && (
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>W</Text>
        </TouchableOpacity>
      )}
      <View style={styles.centerButtons}>
        {Platform.OS === 'web' && (
          <>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.buttonText}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.buttonText}>Horarios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.buttonText}>W</Text>
            </TouchableOpacity>
          </>
        )}
        {Platform.OS === 'android' && (
          <Text style={styles.title}>Pastillero App</Text>
        )}
      </View>
      <TouchableOpacity style={styles.rightButton} onPress={() => navigation.navigate('login')}>
        {Platform.OS === 'web' && (
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        )}
        {Platform.OS === 'android' && (
          <Text style={styles.buttonText}>=</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
