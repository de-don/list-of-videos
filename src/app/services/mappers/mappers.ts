/** Mapper DTO => Model */
export interface MapperFromDTO<DTO, Model> {
  /** Map DTO object to model instance */
  fromDto(dto: DTO): Model;
}

/** Mapper Model => DTO */
export interface MapperToDTO<DTO, Model> {
  /** Map Model instance to DTO object */
  toDto(model: Model): DTO;
}

/** Mapper Model <=> DTO */
export interface Mapper<Dto, Model> extends MapperFromDTO<Dto, Model>, MapperToDTO<Dto, Model> {
}
