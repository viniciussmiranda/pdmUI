import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import {
  Text,
  Avatar,
  Button,
  List,
  Divider,
  Dialog,
  Portal,
  RadioButton,
  Checkbox,
  SegmentedButtons,
  DataTable,
  useTheme,
  Surface,
  ActivityIndicator,
  HelperText,
  IconButton,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const theme = useTheme();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [segment, setSegment] = useState('day');
  const [listExpanded, setListExpanded] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const tableData = [
    { name: 'Componentes', v4: '27', v5: '35', status: '↑' },
    { name: 'Temas', v4: 'Light/Dark', v5: 'Material 3', status: '✨' },
    { name: 'Acessibilidade', v4: 'Básica', v5: 'Avançada', status: '↑' },
    { name: 'TypeScript', v4: 'Parcial', v5: 'Total', status: '↑' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar sua galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>


      <Surface style={[styles.profileCard, { backgroundColor: theme.colors.primaryContainer }]} elevation={0}>
        <View style={{ alignItems: 'center', gap: 12 }}>

          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.avatarWrapper}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <Avatar.Image
                size={88}
                source={{ uri: 'https://i.pravatar.cc/176?img=12' }}
              />
            )}
            <View style={[styles.editBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={{ color: 'white', fontSize: 12 }}>✏</Text>
            </View>
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <Text variant="headlineSmall" style={{ color: theme.colors.onPrimaryContainer, fontWeight: '700' }}>
              Vini
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onPrimaryContainer, opacity: 0.75 }}>
              Network Engineer • Recife, PE
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button mode="contained" onPress={() => {}} compact icon="message-text">
              Mensagem
            </Button>
            <Button mode="outlined" onPress={() => setDialogVisible(true)} compact icon="account-plus">
              Seguir
            </Button>
          </View>
        </View>
      </Surface>

      
      <Text variant="titleMedium" style={styles.sectionTitle}>Período de Atividade</Text>
      <SegmentedButtons
        value={segment}
        onValueChange={setSegment}
        buttons={[
          { value: 'day', label: 'Dia', icon: 'calendar-today' },
          { value: 'week', label: 'Semana', icon: 'calendar-week' },
          { value: 'month', label: 'Mês', icon: 'calendar-month' },
        ]}
        style={{ marginBottom: 16 }}
      />

      <View style={styles.statsRow}>
        {[
          { label: 'Projetos', value: '24' },
          { label: 'Commits', value: '1.2k' },
          { label: 'Stars', value: '348' },
        ].map((stat) => (
          <Surface key={stat.label} style={styles.statCard} elevation={2}>
            <Text variant="headlineMedium" style={{ color: theme.colors.primary, fontWeight: '700' }}>
              {stat.value}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {stat.label}
            </Text>
          </Surface>
        ))}
      </View>

      <Divider style={styles.divider} />

      {/* CONFIGURAÇÕES */}
      <Text variant="titleMedium" style={styles.sectionTitle}>Configurações</Text>
      <Surface style={{ borderRadius: 16 }} elevation={1}>
        <List.AccordionGroup>
          <List.Accordion
            title="Preferências"
            id="1"
            left={(props) => <List.Icon {...props} icon="cog" />}
            expanded={listExpanded}
            onPress={() => setListExpanded(!listExpanded)}
          >
            <List.Item
              title="Notificações push"
              description="Receber alertas em tempo real"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Checkbox status={checked1 ? 'checked' : 'unchecked'} onPress={() => setChecked1(!checked1)} />
              )}
            />
            <List.Item
              title="Modo escuro automático"
              description="Seguir configurações do sistema"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Checkbox status={checked2 ? 'checked' : 'unchecked'} onPress={() => setChecked2(!checked2)} />
              )}
            />
          </List.Accordion>
        </List.AccordionGroup>
        <Divider />
        <List.Item
          title="Perfil público"
          description="Visível para outros usuários"
          left={(props) => <List.Icon {...props} icon="account-circle" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Segurança"
          description="Senha e autenticação"
          left={(props) => <List.Icon {...props} icon="shield-account" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
        />
      </Surface>

      <Divider style={styles.divider} />

      {/* IDIOMA */}
      <Text variant="titleMedium" style={styles.sectionTitle}>Idioma</Text>
      <Surface style={{ borderRadius: 16, overflow: 'hidden' }} elevation={1}>
        <RadioButton.Group onValueChange={setRadioValue} value={radioValue}>
          {[
            { value: 'option1', label: 'Português (Brasil)' },
            { value: 'option2', label: 'English (US)' },
            { value: 'option3', label: 'Español' },
          ].map((opt) => (
            <View key={opt.value}>
              <RadioButton.Item label={opt.label} value={opt.value} />
              <Divider />
            </View>
          ))}
        </RadioButton.Group>
      </Surface>

      <Divider style={styles.divider} />


      <Divider style={styles.divider} />

      <Surface style={styles.loadingCard} elevation={1}>
        <ActivityIndicator size="small" />
        <Text variant="bodyMedium" style={{ marginLeft: 12, color: theme.colors.onSurfaceVariant }}>
          Sincronizando dados...
        </Text>
      </Surface>

      <HelperText type="info" visible={true} style={{ marginTop: 8 }}>
        💡 Toque na foto de perfil para alterá-la da sua galeria.
      </HelperText>

      <View style={{ height: 40 }} />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} style={{ borderRadius: 24 }}>
          <Dialog.Icon icon="account-check" />
          <Dialog.Title style={{ textAlign: 'center' }}>Seguir Vinicius?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
              Você receberá notificações sobre as atividades de Vinicius Network Engineer.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
            <Button mode="contained" onPress={() => setDialogVisible(false)}>Seguir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },
  profileCard: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  onlineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 4,
  },
  divider: { marginVertical: 20 },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    gap: 4,
  },
  loadingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
});
