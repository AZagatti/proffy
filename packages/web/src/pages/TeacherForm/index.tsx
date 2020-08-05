import React, { useCallback, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '@proffy/axios-config';

import PageHeader from '@components/PageHeader';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import Select from '@components/Select';

import warningIcon from '@assets/images/icons/warning.svg';

import { Container } from './styles';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

const initialData = {
  name: '',
  avatar: '',
  whatsapp: '',
  bio: '',
  subject: '',
  cost: '',
};

const initialWeekDay = {
  week_day: 0,
  from: '',
  to: '',
};

type ValuesEvent = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [values, setValues] = useState(initialData);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    initialWeekDay,
  ]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems(state => [...state, initialWeekDay]);
  }, []);

  const onChangeValue = useCallback(
    (name: string, e: ChangeEvent<ValuesEvent>) => {
      const { value } = e.target;
      setValues(state => ({ ...state, [name]: value }));
    },
    [],
  );

  const setScheduleItemValue = useCallback(
    (index: number, field: string, e: ChangeEvent<ValuesEvent>) => {
      const { value } = e.target;
      const newScheduleItems = scheduleItems.map((scheduleItem, i) =>
        index === i ? { ...scheduleItem, [field]: value } : scheduleItem,
      );

      setScheduleItems(newScheduleItems);
    },
    [scheduleItems],
  );

  const handleCreateClass = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { avatar, bio, cost, name, subject, whatsapp } = values;

      try {
        await api.post('classes', {
          name,
          avatar,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        });
        alert('Cadastro realizado com sucesso');
        history.push('/');
      } catch (err) {
        alert('Erro no cadastro');
      }
    },
    [values, scheduleItems, history],
  );

  return (
    <Container className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={values.name}
              onChange={e => onChangeValue('name', e)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={values.avatar}
              onChange={e => onChangeValue('avatar', e)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={values.whatsapp}
              onChange={e => onChangeValue('whatsapp', e)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={values.bio}
              onChange={e => onChangeValue('bio', e)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={values.subject}
              onChange={e => onChangeValue('subject', e)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Artes' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Física', label: 'Física' },
                { value: 'História', label: 'História' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={values.cost}
              onChange={e => onChangeValue('cost', e)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={() => addNewScheduleItem()}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div
                key={scheduleItem.week_day + String(index)}
                className="schedule-item"
              >
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e)}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={e => setScheduleItemValue(index, 'from', e)}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, 'to', e)}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </Container>
  );
};

export default TeacherForm;
