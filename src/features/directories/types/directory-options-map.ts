import { DirectoryModel } from './directory-models';
import { SelectOption } from '@/src/shared/interfaces/form-select.interface';

export type DirectoryOptionsMap = Partial<Record<DirectoryModel, SelectOption[]>>;
