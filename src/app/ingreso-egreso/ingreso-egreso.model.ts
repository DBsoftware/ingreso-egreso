export class IngresoEgresoModel {
    descripcion: string;
    monto: string;
    tipo: string;
    uid?: string;

    constructor(data: any) {
        this.descripcion = data && data.descripcion || null;
        this.monto = data && data.monto || null;
        this.tipo = data && data.tipo || null;
        // this.uid = data && data.uid || null;
    }
}
