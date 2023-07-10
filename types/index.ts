export interface ModalInterface {
     isOpen: boolean;
     closeModal: () => void;
}

export interface ProuductInterface {
     _id?: string,
     title: string,
     slug: string,
     price: number,
     picture?: string,
     discount?: number,
     discountStartDate?: string,
     discountEndDate?: string
}

export interface CartInterface {
     _id?: string,
     userId: string | null,
     productId: string | undefined,
     title: string,
     price: number,
     discount?: number,
     quantity: number,
}

export interface CartUpdate {
     id: string | undefined,
     quantity: number
}