// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FilterQuery, Query, model } from 'mongoose';

class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>,
  ) {}
  // search , priceRange , sort , paginate
  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  // Specifically filter on any field like price,brand....
  filter(excludedField: string[]) {
    const copyQuery = { ...this.query };
    excludedField.forEach((fieldName) => delete copyQuery[fieldName]);
    if (copyQuery) {
      this.modelQuery = this.modelQuery.find(copyQuery as FilterQuery<T>);
    }
    return this;
  }

  // filter=lt=500,gt=200
  priceRange() {
    const filter = this.query?.filter as string;
    if (filter) {
      const gtMatch = filter.match(/gt=(\d+)/);
      const ltMatch = filter.match(/lt=(\d+)/);

      if (gtMatch && ltMatch) {
        const gt = Number(gtMatch[1]);
        const lt = Number(ltMatch[1]);
        this.modelQuery = this.modelQuery.find({
          price: { $lte: lt, $gte: gt },
        });
      } else if (gtMatch) {
        const gt = Number(gtMatch[1]);
        this.modelQuery = this.modelQuery.find({
          price: { $gte: gt },
        });
      } else if (ltMatch) {
        const lt = Number(ltMatch[1]);
        this.modelQuery = this.modelQuery.find({
          price: { $lte: lt },
        });
      }
    }
    return this;
  }
  sort() {
    const sort = this.query?.sort as string;
    if (sort) {
      const sortQuery = sort.split(',').join(' ');
      this.modelQuery = this.modelQuery.sort(sortQuery);
    }
    return this;
  }
  paginate(page: number, limit: number) {
    if (this.query?.limit) limit = Number(this.query?.limit);
    if (this.query?.page) page = Number(this.query?.page);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}

export default QueryBuilder;
