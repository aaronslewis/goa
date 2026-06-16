import { Injectable, signal, computed } from '@angular/core';

export interface Program {
  id: string;
  name: string;
  address: string;
  status: 'authorized' | 'pending' | 'expired';
  services: string[];
}

export type UserRole = 'super-admin' | 'access-manager' | 'staff';
export type VisitType = 'first' | 'returning';

@Injectable({ providedIn: 'root' })
export class ProgramService {
  readonly programs: Program[] = [
    {
      id: '1',
      name: 'Manning Family Day Home Program',
      address: '202 3rd Avenue SE, Manning',
      status: 'authorized',
      services: ['Claims', 'Child Registration', 'Licensing', 'FDHA Contract'],
    },
    {
      id: '2',
      name: 'ABC Program',
      address: '16520 – 24 Street SW, Calgary, AB T2Y4W2',
      status: 'pending',
      services: ['ECWSGA', 'FDHA Contract'],
    },
    {
      id: '3',
      name: 'ABC Child Development Centre',
      address: '8B 11411 40 Avenue, Edmonton, AB T6J0R4',
      status: 'authorized',
      services: ['FDHA Contract', 'Licensing'],
    },
  ];

  private readonly _selectedProgram = signal<Program | null>(null);
  private readonly _role = signal<UserRole>('super-admin');
  private readonly _visitType = signal<VisitType>('first');
  private readonly _selectorOpen = signal(false);

  readonly selectedProgram = this._selectedProgram.asReadonly();
  readonly role = this._role.asReadonly();
  readonly visitType = this._visitType.asReadonly();
  readonly selectorOpen = this._selectorOpen.asReadonly();

  readonly hasProgram = computed(() => this._selectedProgram() !== null);

  readonly displayName = computed(() => {
    const p = this._selectedProgram();
    return p ? `${p.name}, ${p.address}` : null;
  });

  selectProgram(id: string): void {
    this._selectedProgram.set(this.programs.find((p) => p.id === id) ?? null);
  }

  clearProgram(): void {
    this._selectedProgram.set(null);
  }

  setRole(role: UserRole): void {
    this._role.set(role);
  }

  setVisitType(type: VisitType): void {
    this._visitType.set(type);
  }

  openSelector(): void {
    this._selectorOpen.set(true);
  }

  closeSelector(): void {
    this._selectorOpen.set(false);
  }
}
