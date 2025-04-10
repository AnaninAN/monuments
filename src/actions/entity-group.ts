'use server';

import { logger } from '@/lib/logger/logger';
import { GroupFormSchema, TGroupFormData } from '@/schemas/group-form-schema';
import {
  addEntityGroupData,
  delEntityGroupData,
  getEntityGroupByIdData,
  getEntityGroupByNameData,
  updateEntityGroupData,
} from '@/data/entity-group';
import { Entity } from '@/types/types';

const nameEntity = (entity: Entity) => {
  switch (entity) {
    case 'warehouseGroup':
      return 'склада';
    case 'materialGroup':
      return 'материала';
    default:
      return '';
  }
};

export const entityGroupAction = async (
  entity: Entity,
  values: TGroupFormData,
  id?: number
) => {
  if (id) {
    const validatedFields = GroupFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error(entity, 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const dbWarehouseGroup = await getEntityGroupByIdData(entity, id);

    if (!dbWarehouseGroup) {
      logger.error(entity, `Группа ${nameEntity(entity)} не найдена`, {
        id,
      });
      return { error: `Группа ${nameEntity(entity)} не найдена!` };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parentname, ...newValues } = values;

    const count = await updateEntityGroupData(entity, id, newValues);

    if (count === null) {
      logger.error(entity, `Группа ${nameEntity(entity)} не обновлена!`, {
        id,
      });
      return { error: `Группа ${nameEntity(entity)} не обновлена!` };
    }

    logger.info(entity, `Данные группы ${nameEntity(entity)} обновлены`, {
      id,
    });
    return { success: `Данные группы ${nameEntity(entity)} обновлены!`, count };
  } else {
    const validatedFields = GroupFormSchema.safeParse(values);

    if (!validatedFields.success) {
      logger.error(entity, 'Неверные данные формы', {
        errors: validatedFields.error,
      });
      return { error: 'Поля с ошибками' };
    }

    const existingWarehouseGroup = await getEntityGroupByNameData(
      entity,
      validatedFields.data.name
    );

    if (existingWarehouseGroup) {
      logger.warn(entity, 'Такое наименование уже используется!', {
        name: validatedFields.data.name,
      });
      return { error: 'Такое наименование уже используется!' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parentname, ...newValues } = validatedFields.data;

    const count = await addEntityGroupData(entity, newValues);

    if (count === null) {
      logger.error(entity, `Группа ${nameEntity(entity)} не создана!`, {
        name: validatedFields.data.name,
      });
      return { error: `Группа ${nameEntity(entity)} не создана!` };
    }

    logger.info(entity, `Группа ${nameEntity(entity)} создана!`, {
      name: validatedFields.data.name,
    });
    return { success: `Группа ${nameEntity(entity)} создана!`, count };
  }
};

export const delEntityGroupAction = async (entity: Entity, id: number) => {
  const existingWarehouseGroup = await getEntityGroupByIdData(entity, id);

  if (!existingWarehouseGroup) {
    logger.warn(entity, `Группа ${nameEntity(entity)} не существует!`, {
      id,
    });
    return { error: `Группа ${nameEntity(entity)} не существует!` };
  }

  const count = await delEntityGroupData(entity, id);

  if (count === null) {
    logger.error(entity, `Группа ${nameEntity(entity)} не удалена!`, {
      id,
    });
    return { error: `Группа ${nameEntity(entity)} не удалена!` };
  }
  logger.info(entity, `Группа ${nameEntity(entity)} удалена!`, { id });
  return { success: `Группа ${nameEntity(entity)} удалена!`, count };
};
