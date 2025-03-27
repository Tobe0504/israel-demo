export type modalGenericType = {
  [key: string]: boolean;
};

export type Response<T> = {
  message: string | undefined;
  description: string;
  code: string;
  success: boolean;
  data: T;
  status: number;
};

export type productCategoriesRequestDataType = {
  SingleResult: null | string;
  StatusCode: number;
  Error: null | string;
  Message: string;
  Count: number;
  Result: productCategoriesType[];
};

export type productCategoriesType = {
  Id: number;
  Name: string;
  Slug: string;
  WebUrl: string;
  MobileUrl: string;
  Products: null;
};

export type requestType = {
  isLoading: boolean;
  data: any;
  error: any;
  id?: string;
};

export type ColorType = {
  Id: number;
  Name: string;
  Products: null;
};

export type HeightType = {
  Id: number;
  Name: string;
  Products: null;
};

export type LocationType = {
  Id: number;
  Name: string;
  Products: null;
};

export type ShapeType = {
  Id: number;
  Name: string;
  Products: null;
};

export type ProductSubtype = {
  Id: number;
  Name: string;
  Slug: null;
  WebUrl: null;
  MobileUrl: null;
  Products: null;
};

export type ColorSubType = {
  Id: number;
  Name: string;
  HexCode: string;
};

export type ProductColorToneType = {
  Id: number;
  Product: null;
  Color: ColorSubType;
  isActive?: boolean;
};

type ProductDesignType = {
  Id: number;
  Product: null;
  DesignType: {
    Id: number;
    Name: string;
  };
}[];

export type ProductImageType = {
  Id: number;
  ProductId: number;
  WebThumbnailUrl: string;
  WebImageUrl: string;
  MobileThumbnailUrl: string;
  MobileImageUrl: string;
};

export type productType = {
  Id: number;
  Code: string;
  Name: string;
  Slug: string;
  Description: string;
  PercentageDiscount: number;
  Price: number;
  Weight: number;
  DiscountedPrice: number;
  QuantityPurchased: number;
  QuantityInStock: number;
  MinimumQuantityofProductsNeeded: null | number;
  IntensityMin: number;
  IntensityMax: number;
  IsFittingColorVariation: boolean;
  IsLightingLocationDual: boolean;
  IsHeightAdjustable: boolean;
  IsHeightAdjustableUnlimited: boolean;
  MaxAdjustableHeight: number;
  DropHeight: number;
  IsApproved: boolean;
  IsFeatured: boolean;
  DateCreated: string;
  DateApproved: string;
  DateDeleted: string;
  createdBy: number;
  approvedBy: number;
  deletedBy: number;
  CreatedBy: number;
  ApprovedBy: number;
  DeletedBy: number;
  IsActive: boolean;
  ConversionRate: number;
  ProductBulb: number;
  TotalWattage: number;
  IsDeleted: boolean;
  DiscountStartDate: string;
  DiscountEndDate: string;
  ColorType: ColorType;
  HeightType: HeightType;

  Location: LocationType;
  Shape: ShapeType;

  ProductType: {
    Id: 0;
    Name: "";
    Slug: null;
    WebUrl: null;
    MobileUrl: null;
    Products: null;
  };
  ProductColorTone: ProductColorToneType[];
  ProductDesign: ProductDesignType;
  ProductFittingColor: [
    {
      Id: 0;
      Product: null;
      Color: {
        Id: 0;
        Name: "";
        HexCode: "";
      };
    }
  ];
  ProductFittingMaterial: [
    {
      Id: 0;
      Product: null;
      FittingMaterial: {
        Id: 0;
        Name: "";
      };
    }
  ];
  ProductImage: ProductImageType[];
  SpaceTypes: any;
  ProductDimension: [
    {
      Id: 0;
      Product: null;
      Length: "";
      Width: "";
      Height: "";
    }
  ];
  FormattedDiscountedPrice: "";
};

export type userType = {
  Id: number;
  Name: string;
  PhoneNumber: string;
  Email: string;
  Password: null;
  Address: string;
  CreationDate: string | null;
  Captcha: string | null;
  OnboardingDevice: string;
  LoginType: string;
  IdToken: null | string;
  IsQualifiedForFirstTimeDiscount: boolean;
  IsActive: boolean;
  IsBlocked: boolean;
};

export type cartItemType = {
  DateCreated: string;
  Id: number;
  IsProductOutOfStock: boolean;
  ProductId: number;
  UserId: number;
};

export type productOrderType = {
  date: Date | string;
  price: number | string;
};

export type paymentMethodTypes = {
  Id: number;
  ImageUrl: string;
  IsAndroidActive: boolean;
  IsWebActive: boolean;
  IsiOSActive: boolean;
  Name: string;
  isActive: boolean;
};
