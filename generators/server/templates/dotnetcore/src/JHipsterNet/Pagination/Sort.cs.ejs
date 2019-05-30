using System.Collections.Generic;
using System.Linq;

namespace JHipsterNet.Pagination {
    public class Sort {
        public const Direction DefaultDirection = Direction.Asc;
        public static readonly Sort Unsorted = new Sort();


        public Sort(IList<Order> orders)
        {
            Orders = orders ?? new List<Order>();
        }

        public Sort(Direction direction, IEnumerable<string> properties) : this(properties
            .Select(it => new Order(direction, it)).ToList())
        {
        }


        public Sort(IEnumerable<string> properties) : this(DefaultDirection, properties)
        {
        }

        public Sort(Direction direction, params string[] properties) : this(direction,
            properties as IEnumerable<string>)
        {
        }

        public Sort(params string[] properties) : this(DefaultDirection, properties as IEnumerable<string>)
        {
        }

        public IList<Order> Orders { get; }

        public Sort Ascending()
        {
            return WithDirection(Direction.Asc);
        }

        public Sort Descending()
        {
            return WithDirection(Direction.Desc);
        }

        public bool IsSorted()
        {
            return Orders.Any();
        }

        public bool IsUnsorted()
        {
            return !IsSorted();
        }

        public Sort WithDirection(Direction direction)
        {
            return new Sort(Orders?.Select(it => new Order(direction, it.Property)).ToList());
        }

        public Sort And(Sort these)
        {
            var orders = new List<Order>();
            orders.AddRange(Orders);
            orders.AddRange(these.Orders);
            return new Sort(orders);
        }

        //TODO add Equals
    }

    public class Order {
        public bool IgnoreCase;

        public Order(Direction direction, string property)
        {
            Direction = direction;
            Property = property;
        }

        public Direction Direction { get; }
        public string Property { get; }
    }

    public enum Direction {
        Asc,
        Desc
    }

    public static class DirectionExtensions {
        public static bool IsAscending(this Direction direction)
        {
            return direction.Equals(Direction.Asc);
        }

        public static bool IsDescending(this Direction direction)
        {
            return direction.Equals(Direction.Desc);
        }
    }
}
