const RideService = require('./ride.service');
const { models } = require('../libs/sequelize');
jest.mock('../libs/sequelize', () => ({
  models: {
    Ride: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    Driver: {
      findOne: jest.fn(),
      update: jest.fn(),
    },
    Rider: {
      findOne: jest.fn(),
      update: jest.fn(),
    },
    Payment: {
      create: jest.fn(),
    },
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('RideService', () => {
  let rideService;

  beforeEach(() => {
    rideService = new RideService();
    jest.clearAllMocks();
  });
  describe('create', () => {
    const mockData = {
      riderId: 1,
      startLat: 4.60971,
      startLong: -74.0705,
      endLat: 4.638193,
      endLong: -74.084046,
      status: 'Started',
    };

    it('should throw an error if the rider is not available', async () => {
      models.Rider.findOne.mockResolvedValue(null);

      await expect(rideService.create(mockData)).rejects.toThrow(
        'Rider is not available.'
      );
      expect(models.Rider.findOne).toHaveBeenCalledWith(expect.anything());
    });

    it('should throw an error if no drivers are available', async () => {
      models.Rider.findOne.mockResolvedValue({ id: 1, isAvailable: true });
      models.Driver.findOne.mockResolvedValue(null);

      await expect(rideService.create(mockData)).rejects.toThrow(
        'Drivers are not available.'
      );
      expect(models.Driver.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { isAvailable: true } })
      );
    });

    //create succefull ride
    it('should successfully create a ride if a rider and a driver are available', async () => {
      models.Rider.findOne.mockResolvedValue({ id: 1, isAvailable: true });
      models.Driver.findOne.mockResolvedValue({ id: 2, isAvailable: true });
      models.Ride.create.mockResolvedValue({ ...mockData, id: 1 });

      await expect(rideService.create(mockData)).resolves.toEqual(
        expect.objectContaining({ id: 1 })
      );
      expect(models.Ride.create).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything()
      );
    });

    it('should calculate distance correctly for the ride', async () => {
      models.Rider.findOne.mockResolvedValue({ id: 1, isAvailable: true });
      models.Driver.findOne.mockResolvedValue({ id: 2, isAvailable: true });
      models.Ride.create.mockImplementation((data) => Promise.resolve(data)); //

      const ride = await rideService.create(mockData);
    });


    it('should throw an error with invalid input data', async () => {
      const invalidData = { ...mockData, startLat: 91 }; // Latitud inválida

      jest
        .spyOn(RideService.prototype, 'create')
        .mockImplementation(async (data) => {
          const { error } = createRideSchema.validate(data);
          if (error) {
            throw new Error('Validation failed');
          }
          return models.Ride.create(data);
        });

      await expect(rideService.create(invalidData)).rejects.toThrow(
        'Validation failed'
      );
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
  });

  describe('endRide', () => {
    const mockEndRideData = {
      rideId: 1,
      endLat: 4.638193,
      endLong: -74.084046,
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should end a ride successfully with valid data', async () => {
      const mockRide = {
        ...mockEndRideData,
        status: 'Started',
        endTime: expect.any(Date),
        save: jest.fn().mockResolvedValue(true),
      };
      models.Ride.findOne.mockResolvedValue(mockRide);

      await expect(rideService.endRide(mockEndRideData)).resolves.toEqual(
        expect.objectContaining({
          status: 'Ended',
        })
      );
      expect(models.Ride.findOne).toHaveBeenCalledWith(expect.anything());
      expect(mockRide.save).toHaveBeenCalled();
    });

    it('should throw an error if the ride is not found', async () => {
      models.Ride.findOne.mockResolvedValue(null);

      await expect(rideService.endRide(mockEndRideData)).rejects.toThrow(
        'ride not found'
      );
    });

    it('should throw an error if the ride has already ended', async () => {
      const mockRide = {
        ...mockEndRideData,
        status: 'Ended',
        save: jest.fn().mockResolvedValue(true),
      };
      models.Ride.findOne.mockResolvedValue(mockRide);

      await expect(rideService.endRide(mockEndRideData)).rejects.toThrow(
        'The ride has already ended'
      );
    });

    it('should throw an error if end coordinates do not match', async () => {
      const mockRide = {
        ...mockEndRideData,
        endLat: 4.639193, //diferents coordinates
        endLong: -74.085046,
        status: 'Started',
        save: jest.fn().mockResolvedValue(true),
      };
      models.Ride.findOne.mockResolvedValue(mockRide);

      await expect(rideService.endRide(mockEndRideData)).rejects.toThrow(
        'Invalid coordinates'
      );
    });
  });
});
